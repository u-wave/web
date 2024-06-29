import { useTranslator } from '@u-wave/react-translate';
import Button from '@mui/material/Button';
import { mdiCopyright } from '@mdi/js';
import SvgIcon from '../SvgIcon';
import GithubIcon from './GithubIcon';

type LinkProps = {
  href: string,
  children: React.ReactNode,
};
function Link({ href, children }: LinkProps) {
  return (
    <Button
      className="SettingsPanel-link"
      target="_blank"
      href={href}
    >
      {children}
    </Button>
  );
}

function Links() {
  const { t } = useTranslator();

  return (
    <div>
      <h2 className="SettingsPanel-header">{t('settings.links.title')}</h2>
      <Link href="http://u-wave.net">
        <GithubIcon className="SettingsPanel-linkIcon" />
        {t('settings.links.website')}
      </Link>
      <Link href="https://github.com/u-wave/web">
        <GithubIcon className="SettingsPanel-linkIcon" />
        {t('settings.links.source')}
      </Link>
      <Link href="https://github.com/u-wave/web/tree/default/LICENSE">
        <SvgIcon path={mdiCopyright} className="SettingsPanel-linkIcon" />
        {t('settings.links.license')}
      </Link>
      <Link href="https://github.com/twitter/twemoji/blob/master/LICENSE-GRAPHICS">
        <SvgIcon path={mdiCopyright} className="SettingsPanel-linkIcon" />
        {t('settings.links.twemojiLicense')}
      </Link>
    </div>
  );
}

export default Links;
