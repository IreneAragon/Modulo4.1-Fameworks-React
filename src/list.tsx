import React from "react";
import { Link } from "react-router-dom";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';

interface MemberEntity { 
  id: string;
  login: string;
  avatar_url: string;
}  

export const ListPage: React.FC = () => {
  const [members, setMembers] = React.useState<MemberEntity[]>([]);
  const [organization, setOrganization] = React.useState(""); 
  const [filter, setFilter] = React.useState(""); 
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
      <form onSubmit={handleSearchOrganization}>
        <h2>Search one organization from Github</h2>
        <TextField 
          defaultValue="Lemoncode"
          onChange={(e) => setOrganization(e.target.value)}
          id="outlined-basic" 
          label="Organization" 
          variant="outlined" />
        <Button type="submit" variant="contained" size="large" endIcon={<SearchIcon />}>
          Search
        </Button>
        <h3>These are the members of {filter}</h3>
      </form>

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: '80vh' }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell> AVATAR </TableCell>
                <TableCell> ID </TableCell>
                <TableCell> NAME </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {members
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((member) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={member.id}>
                      <TableCell><img src={member.avatar_url} /></TableCell>
                      <TableCell>{member.id}</TableCell>
                      <TableCell><Link to={`/detail/${member.login}`}>{member.login}</Link></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
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
