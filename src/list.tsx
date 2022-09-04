import React from "react";
import { Link } from "react-router-dom";

interface MemberEntity { 
  id: string;
  login: string;
  avatar_url: string;
} 

export const ListPage: React.FC = () => {
  const [members, setMembers] = React.useState<MemberEntity[]>([]);
  const [organization, setOrganization] = React.useState("Lemoncode"); 
  const [filter, setFilter] = React.useState("Lemoncode"); 
  let organizationDefault = "Lemoncode";
  let showError = false;

  // React.useEffect(() => {  
  //   fetch(`https://api.github.com/orgs/${filter}/members`)
  //     .then((response) => response.json())
  //     .then((list) => setMembers(list)); 
  // }, [filter]); 

  fetch(`https://api.github.com/orgs/${filter}/members`).then((response) => {
    if (response.ok) {
      organizationDefault = organization;
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
    console.log(error)
  });

  const handleSearchOrganization = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFilter(organization);
  };

  return (
    <>
      <form onSubmit={handleSearchOrganization}>
        <h2>Hello from List page</h2>
        <input 
          defaultValue="Lemoncode"
          onChange={(e) => setOrganization(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <div className="list-user-list-container">
        <span className="list-header">Avatar</span>
        <span className="list-header">Id</span>
        <span className="list-header">Name</span>
        {members.map((member) => (
          <>
            <img src={member.avatar_url} />
            <span>{member.id}</span>
            <Link to={`/detail/${member.login}`}>{member.login}</Link>
          </>
        ))}
      </div>
      <Link to="/detail">Navigate to detail page</Link>
    </>
  );
};
