import FormControls from '@/components/commonForm/FormControls'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { courseLandingPageFormControls } from '@/config'
import { InstructorContext } from '@/context/instructorContext'
import React, { useContext } from 'react'

const CourseLanding = () => {
    const { courseLandingFormData, setCourseLandingFormData } = useContext(InstructorContext);
  return (
    <Card>
        <CardHeader>
            <CardTitle>Course Landing Page</CardTitle>
        </CardHeader>

        <CardContent>
            <FormControls 
              formControls={courseLandingPageFormControls}
              formData={courseLandingFormData}
              setFormData={setCourseLandingFormData}
            />
        </CardContent>
    </Card>
  )
}

export default CourseLanding
