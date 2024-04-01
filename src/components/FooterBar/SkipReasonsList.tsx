import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

type Reason = {
  name: string,
  label: string,
};
type SkipReasonsListProps = {
  reasons: Reason[],
  onSelect: (name: string) => void,
};
function SkipReasonsList({ reasons, onSelect }: SkipReasonsListProps) {
  return (
    <List className="SkipReasonsList">
      {reasons.map((reason) => (
        <ListItemButton
          key={reason.name}
          onClick={() => onSelect(reason.name)}
        >
          <ListItemText className="SkipReasonsList-label" primary={reason.label} />
        </ListItemButton>
      ))}
    </List>
  );
}

export default SkipReasonsList;
