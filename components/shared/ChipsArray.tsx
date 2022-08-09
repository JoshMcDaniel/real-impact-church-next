import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';

export type LabelLink = {
  label: string;
  link: string;
};

type ChipsArrayProps = {
  data: LabelLink[];
};

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export const ChipsArray = (props: ChipsArrayProps) => {
  const handleClick = (link: string) => {
    if (!!link) {
      window.open(link);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'start',
        flexWrap: 'wrap',
        listStyle: 'none',
        p: 0,
        m: 0,
      }}
      component="ul"
    >
      {props.data.map((data, index) => {
        return (
          <ListItem key={index}>
            <Chip
              label={data.label}
              size="small"
              component="a"
              clickable={!!data.link}
              onClick={() => handleClick(data.link)}
            />
          </ListItem>
        );
      })}
    </Box>
  );
};

export default ChipsArray;
