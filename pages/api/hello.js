// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import dbConncet from '../../utils/dbConnect' ;

dbConncet()  ;
export default async function handler(req, res) {
  res.status(200).json({ name: 'John Doe' })
}
