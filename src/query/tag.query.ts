import { Return } from './query';
import { query } from './query';
import { Tag } from '../interface/interface';

export function listAllTags(): Promise<Return<{tags: Tag[]}>> {
  return query('/content/list/tag');
}