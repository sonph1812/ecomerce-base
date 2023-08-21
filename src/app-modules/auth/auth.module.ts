import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { UserService } from "../users/user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "../users/entities/user.entity";
import { IsNotExist } from "../../common/validators/is-not-exists.validator";

// import { ForgotModule } from 'src/forgot/forgot.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([UserEntity]),
		PassportModule,
		JwtModule.register({
			secret: process.env.JWT_ADMIN_SECRET,
			signOptions: { expiresIn: process.env.JWT_ADMIN_EXPIRES_IN },
		}),
	],
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy, UserService, IsNotExist],
	exports: [AuthService],
})
export class AuthModule {}
