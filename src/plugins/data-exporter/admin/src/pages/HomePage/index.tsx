import React, { useState, useEffect } from "react";
import { request } from "@strapi/helper-plugin";
import { Button } from "@strapi/design-system/Button";
import { Select, Option } from "@strapi/design-system/Select";
import { TextInput } from "@strapi/design-system";
import { Flex } from "@strapi/design-system";
import {
  Box,
  Typography,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  ModalLayout,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@strapi/design-system";
import { Alert } from "@strapi/design-system/Alert";
import { TextButton } from "@strapi/design-system/TextButton";
import pluginId from "../../pluginId";

const HomePage: React.FC = () => {
  const [selectedContentType, setSelectedContentType] = useState<string>("");
  const [data, setData] = useState<any[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [csvUrl, setCsvUrl] = useState<string | null>(null);
  const [challengeId, setChallengeId] = useState<number | null>();
  const [alertVariant, setAlertVariant] = useState<"success" | "danger">(
    "success"
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState<string>("");
  const [modalTitle, setModalTitle] = useState<string>("");
  const [sortField, setSortField] = useState<string>(""); // Track current sort field
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc"); // Track current sort order

  // Helper function to convert JSON data to CSV format
  const jsonToCsv = (jsonData: any) => {
    if (!Array.isArray(jsonData) || jsonData.length === 0) {
      return null;
    }

    const headers = Object.keys(jsonData[0]);
    const csvRows = jsonData.map((row) =>
      headers
        .map((field) => {
          const value = row[field] ? row[field].toString() : "";
          return `"${value.replace(/"/g, '""')}"`;
        })
        .join(",")
    );

    return [headers.join(","), ...csvRows].join("\n");
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedContentType) return;

      setIsFetching(true);

      try {
        let response;

        if (selectedContentType === "users") {
          response = await request(`/${pluginId}/export/users`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          });
        }

        if (selectedContentType === "submissions" && challengeId !== null) {
          response = await request(`/${pluginId}/export/submissions`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: { challengeId },
          });
        }

        if (selectedContentType === "challenges") {
          response = await request(`/${pluginId}/export/challenges`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          });
        }

        if (selectedContentType === "sponsors") {
          response = await request(`/${pluginId}/export/sponsors`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          });
        }

        if (response && response.length > 0) {
          setData(response);
          setMessage("Data fetched successfully!");
          setAlertVariant("success");
        } else {
          setMessage("No data found.");
          setAlertVariant("danger");
          setData([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setMessage("Error fetching data.");
        setAlertVariant("danger");
        setData([]);
      } finally {
        setIsFetching(false);
      }
    };

    fetchData();
  }, [selectedContentType, challengeId]);

  const handleDownload = () => {
    const csvData = jsonToCsv(data);
    if (!csvData) {
      setMessage("Error converting data to CSV.");
      setAlertVariant("danger");
      return;
    }

    const blob = new Blob([csvData], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    setCsvUrl(url);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${selectedContentType}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleOpenModal = (content: string, field: string) => {
    setModalContent(content);
    setModalVisible(true);
    setModalTitle(field);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setModalContent("");
    setModalTitle("");
  };

  // Sort data by field and order
  const sortData = (field: string) => {
    const sortedData = [...data].sort((a, b) => {
      if (a[field] < b[field]) return sortOrder === "asc" ? -1 : 1;
      if (a[field] > b[field]) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
    setData(sortedData);
    setSortField(field);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <Box padding={4}>
      <Typography variant="alpha">Export Content Type to CSV</Typography>

      <Box paddingTop={4} width="500px">
        <Flex alignItems="center" gap="6" direction="row">
          <Box width="250px">
            <Select
              label="Select a Content Type"
              placeholder="Select..."
              value={selectedContentType}
              onChange={setSelectedContentType}
            >
              <Option value="submissions">Submission</Option>
              <Option value="users">Users</Option>
              <Option value="challenges">Challenges</Option>
              <Option value="sponsors">Sponsors</Option>
            </Select>
          </Box>
        </Flex>

        {selectedContentType === "submissions" && (
          <Flex alignItems="center" gap="6" direction="row" paddingTop={4}>
            <Box width="250px">
              <TextInput
                label="Filter by Challenge ID"
                placeholder="Enter ID..."
                value={challengeId}
                onChange={(e: any) => setChallengeId(e.target.value)}
              />
            </Box>
          </Flex>
        )}
      </Box>

      {message && (
        <Box paddingTop={4} width="85vw">
          <Alert title="Export Status" variant={alertVariant}>
            {message}
          </Alert>
        </Box>
      )}

      {data.length > 0 && (
        <Box paddingTop={4}>
          <Button onClick={handleDownload}>Download CSV</Button>
        </Box>
      )}

      {data.length > 0 && (
        <Box paddingTop={4}>
          <Table colCount={Object.keys(data[0]).length}>
            <Thead>
              <Tr>
                {Object.keys(data[0]).map((header) => (
                  <Th
                    key={header}
                    onClick={() => sortData(header)} // Sort by column on click
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    {header}{" "}
                    {sortField === header && (sortOrder === "asc" ? "↑" : "↓")}
                  </Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {data.map((row, index) => (
                <Tr key={index}>
                  {Object.keys(row).map((field) => (
                    <Td
                      key={field}
                      onClick={() => handleOpenModal(row[field], field)}
                      style={{
                        cursor: "pointer",
                        maxWidth: "800px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {row[field]}
                    </Td>
                  ))}
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      )}

      {modalVisible && (
        <ModalLayout onClose={handleCloseModal} labelledBy="full-text-modal">
          <ModalHeader>
            <Typography fontWeight="bold" textColor="neutral800">
              {modalTitle}
            </Typography>
          </ModalHeader>
          <ModalBody>
            <Typography>{modalContent}</Typography>
          </ModalBody>
          <ModalFooter
            startActions={
              <TextButton onClick={handleCloseModal}>Close</TextButton>
            }
          />
        </ModalLayout>
      )}
    </Box>
  );
};

export default HomePage;
