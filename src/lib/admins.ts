console.log('ADMINS env:', process.env.NEXT_PUBLIC_ADMINS)

type Admin = {
  name: string
}

export const admins: Admin[] = process.env.NEXT_PUBLIC_ADMINS
  ? JSON.parse(process.env.NEXT_PUBLIC_ADMINS)
  : []

console.log('Parsed admins:', admins)
