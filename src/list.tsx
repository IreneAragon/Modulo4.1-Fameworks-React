import React from "react";
import { Link } from "react-router-dom";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import SearchIcon from '@mui/icons-material/Search';
import { 
  CustomButton, 
  CustomTableCell, 
  CustomTablePagination, 
  CustomTextField 
} from '../src/customComponentsMui';
import { styled } from '@mui/material/styles';

const CustomTableBody = styled(TableBody) ({
  background: '#536567',
});

const CustomTableRow = styled(TableRow) ({
  '& td': {
    color: '#ebebeb',
    '& a': {
      color: '#ebebeb',
      textDecoration: 'unset',
      border: '1px solid #BB86FC',
      padding: '1em 1.5em',
      background: '#BB86FC',
      borderRadius: '5px',
      '&:hover': {
        background: '#03DAC6',
        transition: '0.5s',
        border: '1px solid #03DAC6',
      },
    },
  },
});

interface MemberEntity { 
  id: string;
  login: string;
  avatar_url: string;
} 

export const ListPage: React.FC = () => {
  const [members, setMembers] = React.useState<MemberEntity[]>([]);
  const [organization, setOrganization] = React.useState(""); 
  const [filter, setFilter] = React.useState("Lemoncode"); 
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  let organizationDefault = "Lemoncode";
  let showError = false;

  React.useEffect(() => { 
    fetch(`https://api.github.com/orgs/${filter}/members`).then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        setFilter(organizationDefault);
        showError = true;
        if (response.status === 404) { 
            throw new Error('Error: Organization not found'); 
        }
      }
    })
    .then((responseJson) => {
        setMembers(responseJson);
    })
    .catch((error) => {
      console.log("The error: ", error)
    });

  }, [filter]); 

  const handleSearchOrganization = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFilter(organization);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0); 
  };

  return (
    <>
      <div className="form-list">
        <form onSubmit={handleSearchOrganization}>
          <h2 className="form-list__headline form-list__headline--color">Search one organization from Github</h2>
          <div className="form-list__input-container">
            <CustomTextField 
              defaultValue="Lemoncode"
              onChange={(e) => setOrganization(e.target.value)}
              id="outlined-basic" 
              label="Organization" 
              variant="outlined" />
            <CustomButton 
              type="submit" 
              variant="contained" 
              size="large" 
              endIcon={<SearchIcon />}>
              Search
            </CustomButton>
          </div>
          <h3 className="form-list__headline">These are the members of {filter}</h3>
        </form>
      </div>

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: '80vh' }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <CustomTableCell> AVATAR </CustomTableCell>
                <CustomTableCell> ID </CustomTableCell>
                <CustomTableCell> NAME </CustomTableCell>
              </TableRow>
            </TableHead>
            <CustomTableBody>
              {members
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((member) => (
                <CustomTableRow hover role="checkbox" tabIndex={-1} key={member.id}>
                      <TableCell><img src={member.avatar_url} /></TableCell>
                      <TableCell>{member.id}</TableCell>
                      <TableCell><Link to={`/detail/${member.login}`}>{member.login}</Link></TableCell>
                </CustomTableRow>
              ))}
            </CustomTableBody>
          </Table>
        </TableContainer>
        <CustomTablePagination
          rowsPerPageOptions={[5, 10, 25, 100]}
          component="div"
          count={members.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage} />
      </Paper>
    </>
  );
};
