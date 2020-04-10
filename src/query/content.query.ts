import { query, Return } from './query';
import { Paragraph } from '../interface/interface';

export type UploadDTO = {
  title: string;
  description: string;
  preview: string;
  paragraph: File;
  headPicture?: File;
  tags: string;
  category: string;
} & {
  [key: string]: File | string;
}

export async function listParagraphs(options: {offset?: number, limit?: number} = {}): Promise<Return<{paragraphs: Paragraph[]}>> {
  const res = await query('/content/list', {
    query: options
  });
  if (Array.isArray(res.paragraphs)) {
    res.paragraphs.forEach(v => {
      v.createdAt = new Date(v.createdAt);
      v.updatedAt = new Date(v.updatedAt);
    });
  }
  return res;
}

export async function createParagraph(options: UploadDTO): Promise<Return<{link: string}>> {
  const formData = new FormData();
  for (const [k, v] of Object.entries(options)) {
    if(v!==undefined)
      formData.set(k, v);
  }
  return query('/content', {
    method: 'POST',
    body: formData
  });
}

export async function showParagraph(id: string): Promise<Return<{paragraph: Paragraph}>> {
  const v = await query(`/content/${id}`);
  v.createdAt = new Date(v.createdAt);
  v.updatedAt = new Date(v.updatedAt);
  return v;
}