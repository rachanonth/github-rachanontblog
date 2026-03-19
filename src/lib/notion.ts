import { Client } from '@notionhq/client';
import type {
  PageObjectResponse,
  PartialPageObjectResponse,
  DatabaseObjectResponse,
  PartialDatabaseObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';

const notion = new Client({
  auth: import.meta.env.NOTION_API_SECRET,
});

export type NotionPost = {
  id: string;
  title: string;
  description: string;
  pubDate: Date | null;
  slug: string;
  coverImage: string | null;
  status: string;
};

type NotionPage = PageObjectResponse | PartialPageObjectResponse | DatabaseObjectResponse | PartialDatabaseObjectResponse;

function getTitle(page: PageObjectResponse): string {
  const titleProp = Object.values(page.properties).find(
    (prop) => prop.type === 'title'
  );
  if (titleProp?.type === 'title') {
    return titleProp.title.map((t) => t.plain_text).join('') || 'Untitled';
  }
  return 'Untitled';
}

function getRichText(page: PageObjectResponse, key: string): string {
  const prop = page.properties[key];
  if (prop?.type === 'rich_text') {
    return prop.rich_text.map((t) => t.plain_text).join('');
  }
  return '';
}

function getDate(page: PageObjectResponse, key: string): Date | null {
  const prop = page.properties[key];
  if (prop?.type === 'date' && prop.date?.start) {
    return new Date(prop.date.start);
  }
  return null;
}

function getSelect(page: PageObjectResponse, key: string): string {
  const prop = page.properties[key];
  if (prop?.type === 'select' && prop.select?.name) {
    return prop.select.name;
  }
  return '';
}

function getCoverImage(page: PageObjectResponse): string | null {
  if (page.cover?.type === 'external') return page.cover.external.url;
  if (page.cover?.type === 'file') return page.cover.file.url;
  return null;
}

function toSlug(title: string, id: string): string {
  const slugified = title
    .toLowerCase()
    .replace(/[^a-z0-9\u0E00-\u0E7F]+/g, '-')
    .replace(/^-|-$/g, '');
  return slugified || id;
}

export async function getNotionPosts(): Promise<NotionPost[]> {
  const databaseId = import.meta.env.NOTION_DATABASE_ID;
  if (!databaseId) throw new Error('NOTION_DATABASE_ID is not set');

  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: 'Status',
      select: { equals: 'Published' },
    },
    sorts: [{ property: 'Date', direction: 'descending' }],
  });

  return response.results
    .filter((page): page is PageObjectResponse => 'properties' in page && page.object === 'page')
    .map((page) => {
      const title = getTitle(page);
      return {
        id: page.id,
        title,
        description: getRichText(page, 'Description'),
        pubDate: getDate(page, 'Date'),
        slug: toSlug(title, page.id),
        coverImage: getCoverImage(page),
        status: getSelect(page, 'Status'),
      };
    });
}

export async function getNotionPostById(id: string) {
  return notion.pages.retrieve({ page_id: id });
}

export async function getNotionPageContent(pageId: string) {
  const blocks = await notion.blocks.children.list({ block_id: pageId });
  return blocks.results;
}
