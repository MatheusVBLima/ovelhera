type Admin = {
  name: string
}

export const admins: Admin[] = process.env.ADMINS
  ? JSON.parse(process.env.ADMINS)
  : []
