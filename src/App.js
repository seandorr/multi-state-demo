import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Input, Tag } from "antd";
import "antd/dist/reset.css";
import { tableColumns } from "./utils/tableColumns";

function App() {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({ name: "", email: "", phone: "" });

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((results) => {
        setData(results.data);
      })
      .catch((error) => {
        console.log("Error getting data: " + error);
      });
  }, []);

  const onChangeName = (event) => {
    setFilters({ ...filters, name: event.target.value });
  };
  const onChangeEmail = (event) => {
    setFilters({ ...filters, email: event.target.value });
  };
  const onChangePhone = (event) => {
    setFilters({ ...filters, phone: event.target.value });
  };

  const onCloseNameFilter = () => {
    setFilters({ ...filters, name: "" });
  };
  const onCloseEmailFilter = () => {
    setFilters({ ...filters, email: "" });
  };
  const onClosePhoneFilter = () => {
    setFilters({ ...filters, phone: "" });
  };

  const tagStyles = {
    width: "fit-content",
  };

  const filteredData = data.filter((data) => {
    return (
      data.name.toLowerCase().includes(filters.name.toLocaleLowerCase()) &&
      data.email.toLowerCase().includes(filters.email.toLocaleLowerCase()) &&
      data.phone.toLowerCase().includes(filters.phone.toLocaleLowerCase())
    );
  });

  return (
    <div style={{ margin: "20px" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
        }}
      >
        {filters.name.length > 0 && (
          <Tag closable onClose={onCloseNameFilter} style={tagStyles}>
            {filters.name}
          </Tag>
        )}
        {filters.email.length > 0 && (
          <Tag closable onClose={onCloseEmailFilter} style={tagStyles}>
            {filters.email}
          </Tag>
        )}
        {filters.phone.length > 0 && (
          <Tag closable onClose={onClosePhoneFilter} style={tagStyles}>
            {filters.phone}
          </Tag>
        )}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
        }}
      >
        <Input
          placeholder="Search Name"
          onChange={onChangeName}
          value={filters.name}
          style={{ width: 200 }}
        />
        <Input
          placeholder="Search Email"
          onChange={onChangeEmail}
          value={filters.email}
          style={{ width: 200 }}
        />
        <Input
          placeholder="Search Phone"
          onChange={onChangePhone}
          value={filters.phone}
          style={{ width: 200 }}
        />
      </div>
      <Table dataSource={filteredData} columns={tableColumns} />
    </div>
  );
}

export default App;
