import { IsIn, IsNotEmpty, IsNumber } from "class-validator";

export class TransactionCreateDto {
  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @IsNotEmpty()
  @IsIn(['topup'])
  type: "topup";

  @IsNotEmpty()
  @IsNumber()
  amount: number;
}