import React from "react";

function TableHeader() {
  return (
    <thead>
      <tr>
        <th>Artist</th>
      </tr>
    </thead>
  );
}

function TableBody(props) {
  var artists = props.user.artists;

  const rows = artists.map((row, index) => {
  return (
    <tr key={index}>
      <td>{row.name}</td>
    </tr>
    );
  });
  return <tbody>{rows}</tbody>;
}

function ArtistTable(props) {
  return (
    <div>
      <table>
        <TableHeader />
        <TableBody
        user={props.userdata}
      />
      </table>
    </div>

  );
}

export default ArtistTable;