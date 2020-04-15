import { IsDefined, IsString } from 'class-validator';
import { SignedInvite } from 'src/invite/invite.service';

export class AssociatePropietarioDTO {
  @IsDefined()
  invite: SignedInvite;

  @IsString()
  lote_nickname: string;
}
