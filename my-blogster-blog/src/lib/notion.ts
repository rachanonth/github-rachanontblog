import { Client } from '@notionhq/client';

const notion = new Client({
  auth: import.meta.env.NOTION_API_SECRET,
});

const databaseId = import.meta.env.NOTION_DATABASE_ID;

export type NotionPost = {
  id: string;
  title: string;
  description: string;
  pubDate: Date | null;
  slug: string;
  coverImage: string | null;
  status: string;
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s\u0E00-\u0E7F-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function getPropertyValue(property: any): any {
  if (!property) return null;
  switch (property.type) {
    case 'title':
      return property.title.map((t: any) => t.plain_text).join('');
    case 'rich_text':
      return property.rich_text.map((t: any) => t.plain_text).join('');
    case 'date':
      return property.date?.start ? new Date(property.date.start) : null;
    case 'select':
      return property.select?.name || null;
    case 'url':
      return property.url;
    case 'files':
      if (property.files.length > 0) {
        const file = property.files[0];
        return file.type === 'external' ? file.external.url : file.file.url;
      }
      return null;
    default:
      return null;
  }
}

export async function getNotionPosts(): Promise<NotionPost[]> {
  if (!databaseId) {
    console.warn('NOTION_DATABASE_ID is not set');
    return [];
  }

  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: 'Status',
        select: { equals: 'Published' },
      },
      sorts: [{ property: 'Date', direction: 'descending' }],
    });

    return response.results.map((page: any) => {
      const props = page.properties;
      const title = getPropertyValue(props.Name || props.Title || props.title) || 'Untitled';
      const coverImage =
        page.cover?.type === 'external'
          ? page.cover.external.url
          : page.cover?.type === 'file'
            ? page.cover.file.url
            : getPropertyValue(props.Cover || props['Cover Image']) || null;

      return {
        id: page.id,
        title,
        description: getPropertyValue(props.Description) || '',
        pubDate: getPropertyValue(props.Date),
        slug: slugify(title) || page.id,
        coverImage,
        status: getPropertyValue(props.Status) || '',
      };
    });
  } catch (error) {
    console.error('Failed to fetch Notion posts:', error);
    return [];
  }
}

export async function getNotionPageContent(pageId: string): Promise<string> {
  try {
    const blocks = await notion.blocks.children.list({ block_id: pageId });
    return blocks.results.map((block: any) => renderBlock(block)).join('\n');
  } catch (error) {
    console.error('Failed to fetch Notion page content:', error);
    return '<p>Failed to load content.</p>';
  }
}

function renderBlock(block: any): string {
  const type = block.type;
  const value = block[type];

  switch (type) {
    case 'paragraph':
      return `<p>${renderRichText(value.rich_text)}</p>`;
    case 'heading_1':
      return `<h1>${renderRichText(value.rich_text)}</h1>`;
    case 'heading_2':
      return `<h2>${renderRichText(value.rich_text)}</h2>`;
    case 'heading_3':
      return `<h3>${renderRichText(value.rich_text)}</h3>`;
    case 'bulleted_list_item':
      return `<li>${renderRichText(value.rich_text)}</li>`;
    case 'numbered_list_item':
      return `<li>${renderRichText(value.rich_text)}</li>`;
    case 'code':
      return `<pre><code class="language-${value.language || 'text'}">${renderRichText(value.rich_text)}</code></pre>`;
    case 'quote':
      return `<blockquote>${renderRichText(value.rich_text)}</blockquote>`;
    case 'divider':
      return '<hr />';
    case 'image': {
      const url = value.type === 'external' ? value.external.url : value.file.url;
      const caption = value.caption?.length > 0 ? renderRichText(value.caption) : '';
      return `<figure><img src="${url}" alt="${caption}" />${caption ? `<figcaption>${caption}</figcaption>` : ''}</figure>`;
    }
    case 'bookmark':
      return `<p><a href="${value.url}" target="_blank" rel="noopener">${value.url}</a></p>`;
    case 'callout':
      return `<div class="callout">${value.icon?.emoji || ''} ${renderRichText(value.rich_text)}</div>`;
    case 'toggle':
      return `<details><summary>${renderRichText(value.rich_text)}</summary></details>`;
    case 'video': {
      const videoUrl = value.type === 'external' ? value.external.url : value.file?.url;
      if (videoUrl?.includes('youtube.com') || videoUrl?.includes('youtu.be')) {
        const videoId = videoUrl.match(/(?:v=|youtu\.be\/)([^&\s]+)/)?.[1];
        if (videoId) {
          return `<iframe width="100%" height="400" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`;
        }
      }
      return `<p><a href="${videoUrl}" target="_blank" rel="noopener">Video</a></p>`;
    }
    default:
      return '';
  }
}

function renderRichText(richText: any[]): string {
  if (!richText || richText.length === 0) return '';
  return richText
    .map((text: any) => {
      let content = escapeHtml(text.plain_text);
      if (text.annotations.bold) content = `<strong>${content}</strong>`;
      if (text.annotations.italic) content = `<em>${content}</em>`;
      if (text.annotations.strikethrough) content = `<s>${content}</s>`;
      if (text.annotations.underline) content = `<u>${content}</u>`;
      if (text.annotations.code) content = `<code>${content}</code>`;
      if (text.href) content = `<a href="${text.href}" target="_blank" rel="noopener">${content}</a>`;
      return content;
    })
    .join('');
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
