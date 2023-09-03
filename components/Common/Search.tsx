import { ActionIcon, Box, TextInput } from "@mantine/core";
import { IconSearch, IconX } from "@tabler/icons-react";

import { FC } from "react";

interface SearchProps {
  searchTerm: string;
  onSearch: (value: string) => void;
  onClear: () => void;
}

const Search: FC<SearchProps> = ({ searchTerm, onSearch, onClear }) => {
  return (
    <Box
      sx={{
        paddingBottom: "16px",
      }}
    >
      <TextInput
        onChange={(event) => onSearch(event.currentTarget.value)}
        value={searchTerm}
        placeholder="Search"
        icon={<IconSearch />}
        rightSection={
          !!searchTerm?.length ? (
            <ActionIcon onClick={onClear}>
              <IconX />
            </ActionIcon>
          ) : null
        }
      />
    </Box>
  );
};

export default Search;
