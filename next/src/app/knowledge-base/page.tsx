import { redirect } from 'next/navigation';
import { getGlobalConfig } from '@/lib/config';

export default function KnowledgeBasePage() {
  const global = getGlobalConfig();
  const knowledgeBaseUrl = global.externalLinks?.knowledgeBase || 'https://incx.tawk.help/';

  redirect(knowledgeBaseUrl);
}
