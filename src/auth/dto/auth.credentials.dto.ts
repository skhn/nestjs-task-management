import { IsString, Matches, matches, MaxLength, MinLength } from "class-validator";

export class AuthCredentialsDto {
  @IsString()
  @MinLength(3)
  @MaxLength(18)
  username: string;

  @IsString()
  @MinLength(3)
  @MaxLength(18)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'pwd is weak',
  })
  password: string;
}
