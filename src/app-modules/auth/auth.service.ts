import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { AuthEmailLoginDto } from "./dto/auth-email-login.dto";
import { AuthUpdateDto } from "./dto/auth-update.dto";
import { randomStringGenerator } from "@nestjs/common/utils/random-string-generator.util";
import * as crypto from "crypto";
import { plainToClass } from "class-transformer";
import { AuthRegisterLoginDto } from "./dto/auth-register-login.dto";
import { UserEntity } from "../users/entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class AuthService {
	constructor(
		private jwtService: JwtService,
		@InjectRepository(UserEntity)
		private readonly userRepo: Repository<UserEntity>,
	) {}

	async validateLogin(loginDto: AuthEmailLoginDto, onlyAdmin: boolean) {
		const user = await this.userRepo.findOne({ where: { email: loginDto.email } });

		const isValidPassword = await bcrypt.compare(loginDto.password, user.password);
		console.log(isValidPassword);
		if (isValidPassword) {
			const token = this.jwtService.sign({
				id: user.id,
				email: user.email,
				fullName: user.name,
			});

			return { token };
		} else {
			throw new HttpException(
				{
					status: HttpStatus.UNPROCESSABLE_ENTITY,
					errors: {
						password: "Incorrect password",
					},
				},
				HttpStatus.UNPROCESSABLE_ENTITY,
			);
		}
	}

	// async validateSocialLogin(
	//   authProvider: string,
	//   socialData: SocialInterface,
	// ): Promise<{ token: string; user: User }> {
	//   let user: User;
	//   const socialEmail = socialData.email?.toLowerCase();
	//
	//   const userByEmail = await this.usersService.findOne({
	//     email: socialEmail,
	//   });
	//
	//   user = await this.usersService.findOne({
	//     socialId: socialData.id,
	//     provider: authProvider,
	//   });
	//
	//   if (user) {
	//     if (socialEmail && !userByEmail) {
	//       user.email = socialEmail;
	//     }
	//     await this.usersService.update(user.id, user);
	//   } else if (userByEmail) {
	//     user = userByEmail;
	//   } else {
	//     const role = plainToClass(Role, {
	//       id: RoleEnum.user,
	//     });
	//     const status = plainToClass(Status, {
	//       id: StatusEnum.active,
	//     });
	//
	//     user = await this.usersService.create({
	//       email: socialEmail,
	//       fullName: socialData.lastName + socialData.firstName,
	//       socialId: socialData.id,
	//       provider: authProvider,
	//       role,
	//       status,
	//     });
	//
	//     user = await this.usersService.findOne({
	//       id: user.id,
	//     });
	//   }
	//
	//   const jwtToken = await this.jwtService.sign({
	//     id: user.id,
	//     role: user.role,
	//   });
	//
	//   return {
	//     token: jwtToken,
	//     user,
	//   };
	// }

	async register(dto: AuthRegisterLoginDto) {
		const user = this.userRepo.create({ name: dto.fullname, email: dto.email, password: dto.password });
		return this.userRepo.save(user);
	}

	async confirmEmail(hash: string) {
		// const user = await this.userService.getMe({
		// 	hash,
		// });

		// if (!user) {
		// 	throw new HttpException(
		// 		{
		// 			status: HttpStatus.NOT_FOUND,
		// 			error: `Not Found`,
		// 		},
		// 		HttpStatus.NOT_FOUND,
		// 	);
		// }

		return "looix";
	}

	async forgotPassword(email: string): Promise<void> {
		// const user = await this.userService.getMe({
		// 	email,
		// });
		// if (!user) {
		// 	throw new HttpException(
		// 		{
		// 			status: HttpStatus.UNPROCESSABLE_ENTITY,
		// 			errors: {
		// 				email: "Email not exists",
		// 			},
		// 		},
		// 		HttpStatus.UNPROCESSABLE_ENTITY,
		// 	);
		// } else {
		// 	const hash = crypto.createHash("sha256").update(randomStringGenerator()).digest("hex");
		// 	// await this.forgotService.create({
		// 	//   hash,
		// 	//   user,
		// 	// });
		// 	//
		// 	// await this.mailService.forgotPassword({
		// 	//   to: email,
		// 	//   data: {
		// 	//     hash,
		// 	//   },
		// 	// });
		// }
	}

	async resetPassword(hash: string, password: string): Promise<void> {
		// const forgot = await this.forgotService.findOne({
		//   where: {
		//     hash,
		//   },
		// });
		// if (!forgot) {
		//   throw new HttpException(
		//     {
		//       status: HttpStatus.UNPROCESSABLE_ENTITY,
		//       errors: {
		//         hash: `Not Found`,
		//       },
		//     },
		//     HttpStatus.UNPROCESSABLE_ENTITY,
		//   );
		// }
		// const user = forgot.user;
		// user.password = password;
		// await user.save();
		// await this.forgotService.softDelete(forgot.id);
	}

	async me(user) {
		// return this.userService.getMe({
		// 	id: user.id,
		// });
	}

	// async update(user: User, userDto: AuthUpdateDto): Promise<User> {
	// 	if (userDto.password) {
	// 		if (userDto.oldPassword) {
	// 			const currentUser = await this.usersService.findOne({
	// 				id: user.id,
	// 			});
	//
	// 			const isValidOldPassword = await bcrypt.compare(userDto.oldPassword, currentUser.password);
	//
	// 			if (!isValidOldPassword) {
	// 				throw new HttpException(
	// 					{
	// 						status: HttpStatus.UNPROCESSABLE_ENTITY,
	// 						errors: {
	// 							oldPassword: "incorrectOldPassword",
	// 						},
	// 					},
	// 					HttpStatus.UNPROCESSABLE_ENTITY,
	// 				);
	// 			}
	// 		} else {
	// 			throw new HttpException(
	// 				{
	// 					status: HttpStatus.UNPROCESSABLE_ENTITY,
	// 					errors: {
	// 						oldPassword: "missingOldPassword",
	// 					},
	// 				},
	// 				HttpStatus.UNPROCESSABLE_ENTITY,
	// 			);
	// 		}
	// 	}
	// 	delete userDto.oldPassword;
	// 	await this.usersService.update(user.id, userDto);
	//
	// 	return this.usersService.findOne({
	// 		id: user.id,
	// 	});
	// }
}
