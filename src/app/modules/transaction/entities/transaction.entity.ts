import { Column, Entity } from "typeorm";

@Entity('transactions')
export class Transaction {
  @Column({ primary: true, generated: 'increment' })
  id: number;

  @Column({ type: 'int' })
  user_id: number;

  @Column({ type: 'enum', enum: ['topup'] })
  type: "topup";

  @Column({ type: 'int' })
  amount: number;
}