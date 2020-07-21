import { IsString } from 'class-validator';

export class AuthenticatedGuestsDTO {
  @IsString()
  inviteId: string;

  @IsString({ each: true })
  approved: string[];

  @IsString({ each: true })
  rejected: string[];

  @IsString({ each: true })
  exited: string[];
}
