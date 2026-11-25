export class CreateStudentDto {
  nim: string;
  name: string;
  email: string;
  major: string;
  semester?: number;
  gpa?: number;
}