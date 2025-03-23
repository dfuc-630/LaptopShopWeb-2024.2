class User {
  constructor(data) {
    this.id = data.id;
    this.address = data.address;
    this.email = data.email;
    this.avatar = data.avatar;
    this.fullName = data.full_name;
    this.password = data.password;
    this.phone = data.phone;
    this.roleId = data.role_id;
  }
}

export default User;