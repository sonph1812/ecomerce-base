import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength, Validate } from "class-validator";
import { Transform } from "class-transformer";
import { IsNotExist } from "../../../common/validators/is-not-exists.validator";

export class AuthRegisterLoginDto {
	@ApiProperty()
	@IsString()
	fullname: string;

	@ApiProperty({ example: "test1@example.com" })
	@Transform(({ value }) => value.toLowerCase().trim())
	@IsEmail()
	@Validate(IsNotExist, ["UserEntity"], {
		message: "Email already exists",
	})
	email: string;

	@ApiProperty()
	@MinLength(6)
	password: string;
}
