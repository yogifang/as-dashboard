import dbConnect from '../../../utils/dbConnect';
import Contacts from '../../../models/dbContacts';

dbConnect();
// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const {
    query: { member },
    method,
  } = req;

  switch (method) {
    case 'GET':
      try {
        const contact = await Contacts.findById(member);

        if (!note) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: contact });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'PUT':
      try {
        const contact = await Note.findByIdAndUpdate(member, req.body, {
          new: true,
          runValidators: true,
        });

        if (!contact) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: contact });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'DELETE':
      try {
        const deletedNote = await Note.deleteOne({ _id: id });

        if (!deletedNote) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
