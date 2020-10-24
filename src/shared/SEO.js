import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

export const SEO = ({
  title,
  noindex = false,
  nofollow = false,
  description,
  twitter,
  facebook,
  canonical,
}) => {
  const { t, i18n } = useTranslation();
  return (
    <Helmet>
      <html lang={i18n.language} />
      <title>{title}</title>
      <meta name="description" content={description || t("SEO.defaultDescription")} />
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Robots meta */}
      <meta
        key="robots"
        name="robots"
        content={`${noindex ? "noindex" : "index"},${nofollow ? "nofollow" : "follow"}`}
      />
      <meta
        key="googlebot"
        name="googlebot"
        content={`${noindex ? "noindex" : "index"},${nofollow ? "nofollow" : "follow"}`}
      />

      {/* Twitter meta */}
      {twitter?.cardType && (
        <meta key="twitter:card" name="twitter:card" content={twitter.cardType} />
      )}
      {twitter?.site && <meta key="twitter:site" name="twitter:site" content={twitter.site} />}
      {twitter?.handle && (
        <meta key="twitter:creator" name="twitter:creator" content={twitter.handle} />
      )}

      {/* Facebook meta */}
      {facebook?.appId && <meta key="fb:app_id" property="fb:app_id" content={facebook.appId} />}
    </Helmet>
  );
};
