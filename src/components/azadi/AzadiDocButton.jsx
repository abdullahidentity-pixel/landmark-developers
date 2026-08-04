import MagneticButton from '../MagneticButton.jsx';
import { WhatsAppIcon } from '../Icons.jsx';
import { useLeadModal } from '../../context/LeadModalContext.jsx';
import { AZADI, WA_MESSAGES } from '../../data/azadi.js';
import { CONTACT } from '../../data/site.js';

const waHref = (msg) => `${CONTACT.whatsappHref}?text=${encodeURIComponent(msg)}`;

/**
 * Document CTA with a graceful fallback.
 *
 * When `url` is a real path we route through the site's existing lead modal,
 * which captures the enquiry and *then* serves the file — the same behaviour as
 * every other download on the site, so campaign downloads land in the same
 * inbox as everything else.
 *
 * When `url` is null (the asset hasn't been supplied yet) we do NOT render a
 * dead button. We fall back to WhatsApp with a prefilled request, so the visitor
 * still converts and the team learns the document is being asked for.
 */
export default function AzadiDocButton({
  url,
  label,
  children,
  variant = 'glass',
  className = '',
  fallbackMessage = WA_MESSAGES.documents,
}) {
  const { openDownload } = useLeadModal();

  if (!url) {
    return (
      <a
        className={`btn btn-whatsapp ${className}`}
        href={waHref(fallbackMessage)}
        target="_blank"
        rel="noopener noreferrer"
      >
        <WhatsAppIcon width="17" height="17" />
        {children}
      </a>
    );
  }

  return (
    <MagneticButton
      as="button"
      type="button"
      variant={variant}
      className={className}
      // `projectShort`, not `project` — the modal prefills its project <select>
      // from this value and only the short name is one of that select's options.
      onClick={() => openDownload(url, label, AZADI.projectShort)}
    >
      {children}
    </MagneticButton>
  );
}
