import { Entity } from "../../core/entity";

interface CustomerProps {
  id?: string;
  name: string;
  email: string;
  password: string;
  role: string | null;
}

export class Customer extends Entity<CustomerProps> {
  get name() {
    return this.props.name;
  }

  get email() {
    return this.props.email;
  }

  get password() {
    return this.props.password;
  }

  get role() {
    return this.props.role;
  }

  get id() {
    return this.props.id;
  }

  static create(props: CustomerProps) {
    return new Customer(props);
  }
}
