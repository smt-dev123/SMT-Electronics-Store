import slugify from 'slugify';
import { nanoid } from 'nanoid';

const slugAuto = (name: string, lengthId: number = 6) => {
  const baseSlug = slugify(name, {
    lower: true,
    strict: true,
    trim: true,
    remove: /[*+~.()'"!:@]/g,
  });
  const shortId = nanoid(lengthId).toLowerCase();
  const newSlug = `${baseSlug}-${shortId}`;
  return newSlug;
};

export default slugAuto;
