export class CreateUserDto {
  email: string;
  password: string;
  hash: string;
  lastName?: string;
  firstName?: string;
}
