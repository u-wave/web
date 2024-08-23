import { Suspense, useCallback, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { intlFormatDistance } from 'date-fns';
import useSWR from 'swr';
import { mdiAlert, mdiMenu } from '@mdi/js';
import uwFetch from '../../utils/fetch';
import SvgIcon from '../SvgIcon';
import DescriptionDialog from './DescriptionDialog';

const downTimeout = 600_000; // 10 minutes

export type Media = {
  /** Title of the media. */
  title: string,
  /** Artist, creator, or uploader of the media. */
  artist: string,
  /** A full HTTP(S) URL to a thumbnail for the media. */
  thumbnail: string,
};

export type Booth = {
  /** - Username of the current DJ. */
  dj: string,
  /** The currently playing media. */
  media: Media,
};

export type Server = {
  /** Name of the server. */
  name: string,
  /** A short description for the server. */
  subtitle: string,
  /** Long-form description for the server. May contain Markdown. */
  description?: string | null,
  /** Web-accessible URL to this server, hosting eg. the web client or a home page. */
  url: string,
  /** Time in milliseconds since the most recent update from this server. */
  timeSincePing: number,
  booth?: Booth | null,
}

type CurrentMediaProps = {
  media: Media,
};
function CurrentMedia({ media }: CurrentMediaProps) {
  return (
    <div className="usl-CurrentMedia">
      <div
        className="usl-CurrentMedia-image"
        style={{ backgroundImage: `url(${JSON.stringify(media.thumbnail)})` }}
      />

      <div className="usl-CurrentMedia-nowPlaying">
        <p className="usl-CurrentMedia-title">
          {media.title}
        </p>
        <p className="usl-CurrentMedia-artist">
          {media.artist}
        </p>
      </div>
    </div>
  );
}

function WarningIcon() {
  return (
    <SvgIcon style={{ height: 16, width: 16, verticalAlign: 'sub' }} path={mdiAlert} />
  );
}

type WarningTextProps = {
  children: React.ReactNode,
};
function WarningText({ children }: WarningTextProps) {
  return (
    <Typography variant="body1" style={{ color: '#ed404f' }}>
      {children}
    </Typography>
  );
}

function timedOutMessage(since: string) {
  return ` This server may be down. It has not responded since ${since}.`;
}

type ServerThumbnailProps = {
  server: Server,
  media: Media | null,
};
function ServerThumbnail({ server, media }: ServerThumbnailProps) {
  const [isOpen, setDescriptionOpen] = useState(false);
  const onOpenDescription = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      event.stopPropagation();
      setDescriptionOpen(true);
    },
    [],
  );
  const onCloseDescription = useCallback(() => {
    setDescriptionOpen(false);
  }, []);

  return (
    <div className="usl-ServerThumbnail">
      <Card>
        <CardContent>
          <div className="usl-ServerThumbnail-header">
            <div>
              <Typography variant="h5">
                {server.name}
              </Typography>
              <Typography variant="body2">
                {server.subtitle}
              </Typography>
            </div>
            {server.description && (
              <IconButton
                aria-label={`View description for ${server.name}`}
                onClick={onOpenDescription}
              >
                <SvgIcon path={mdiMenu} />
              </IconButton>
            )}
          </div>
        </CardContent>

        {media ? (
          <a href={server.url} className="usl-ServerThumbnail-link" aria-label="Join">
            <CurrentMedia media={media} />
          </a>
        ) : (
          <>
            <a href={server.url} className="usl-ServerThumbnail-link">
              <CardContent className="usl-ServerThumbnail-nobodyPlaying">
                <Typography>Nobody is playing!</Typography>
              </CardContent>
            </a>
            <CardActions className="usl-ServerThumbnail-actions">
              <Button
                variant="contained"
                color="primary"
                href={server.url}
              >
                Join
              </Button>
            </CardActions>
          </>
        )}

        {server.timeSincePing >= downTimeout ? (
          <CardContent>
            <WarningText>
              <WarningIcon />
              {timedOutMessage(intlFormatDistance(
                new Date(Date.now() - server.timeSincePing),
                new Date(),
              ))}
            </WarningText>
          </CardContent>
        ) : null}

        {server.description != null ? (
          <DescriptionDialog
            // Not sure why the `.description != null` check doesn't narrow the type
            server={server as Server & { description: string }}
            isOpen={isOpen}
            onCloseDescription={onCloseDescription}
          />
        ) : null}
      </Card>
    </div>
  );
}

function ServerList() {
  const { data: { servers } } = useSWR('https://announce.u-wave.net/', uwFetch<{ servers: Server[] }>, { suspense: true });

  if (servers.length === 0) {
    return <Typography>No servers are currently available.</Typography>;
  }

  return servers.map((server) => (
    <ServerThumbnail
      key={server.url}
      server={server}
      media={server.booth?.media ?? null}
    />
  ));
}

function ServerListLoader() {
  const loading = (
    <div className="ServerList ServerList--loading">
      <CircularProgress />
    </div>
  );

  return (
    <Suspense fallback={loading}>
      <div className="ServerList">
        <ServerList />
      </div>
    </Suspense>
  );
}

export default ServerListLoader;
