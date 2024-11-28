export class User {
  id: number;
  name: string;
  nickName: string;
  email: string;
  password: string;
  bio?: string;
  profilePicture?: string;
  dateOfBirth: Date;
  role: string;

  constructor(
    id: number,
    name: string,
    nickName: string,
    email: string,
    password: string,
    dateOfBirth: Date,
    role: string,
    bio?: string,
    profilePicture?: string
  ) {
    this.id = id;
    this.name = name;
    this.nickName = nickName;
    this.email = email;
    this.password = password;
    this.dateOfBirth = dateOfBirth;
    this.role = role;
    this.bio = bio;
    this.profilePicture = profilePicture;
  }
}
