-- Allow students to manage their own service links

CREATE POLICY "Students can insert own service_students"
ON public.service_students FOR INSERT
TO authenticated
WITH CHECK (
  student_id IN (
    SELECT s.id FROM public.students s WHERE s.user_id = auth.uid()
  )
);

CREATE POLICY "Students can delete own service_students"
ON public.service_students FOR DELETE
TO authenticated
USING (
  student_id IN (
    SELECT s.id FROM public.students s WHERE s.user_id = auth.uid()
  )
);
