import {
  IsString, IsNotEmpty, Length, MinLength,
} from 'class-validator';

class CreateUserRequest {
    @IsString()
    @IsNotEmpty()
    @Length(4, 30)
    username!: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    password!: string;
}

export default CreateUserRequest;
