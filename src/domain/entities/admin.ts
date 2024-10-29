import { Entity } from "../../core/entity";

interface AdminProps {
  id?: string;
  name: string;
  email: string;
  password: string;
  role: string | null;
}

export class Admin extends Entity<AdminProps> {
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

  static create(props: AdminProps) {
    return new Admin(props);
  }
}
