import {
  Box,
  Stack,
  Link,
  Card,
  Button,
  Divider,
  Typography,
  CardHeader,
} from "@mui/material";

AppNewsUpdate.propTypes = {
    title: PropTypes.string,
    subheader: PropTypes.string,
    list: PropTypes.array.isRequired,
  };
  
  export default function AppNewsUpdate({ title, subheader, list, ...other }) {
    return (
      <Card {...other}>
        <CardHeader title={title} subheader={subheader} />
  
        <Scrollbar>
          <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
            {list.map((news) => (
              <NewsItem key={news.id} news={news} />
            ))}
          </Stack>
        </Scrollbar>
  
        <Divider />
  
        <Box sx={{ p: 2, textAlign: 'right' }}>
          <Button size="small" color="inherit" endIcon={<Iconify icon={'eva:arrow-ios-forward-fill'} />}>
            View all
          </Button>
        </Box>
      </Card>
    );
  }
function Posts() {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      {/* <Box
          component="img"
          alt={title}
          src={image}
          sx={{ width: 48, height: 48, borderRadius: 1.5, flexShrink: 0 }}
        />*/}

      <Box sx={{ minWidth: 240, flexGrow: 1 }}>
        <Link color="inherit" variant="subtitle2" underline="hover" noWrap>
          Title here
        </Link>

        <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
          Post here ?
        </Typography>
      </Box>

      <Typography
        variant="caption"
        sx={{ pr: 3, flexShrink: 0, color: "text.secondary" }}
      ></Typography>
    </Stack>
  );
}

export default Posts;
