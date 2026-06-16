/**
 * InputGroup — a horizontal cluster of inputs and add-ons that read as a
 * single control (username with @-prefix, search with scope picker, value
 * with unit + copy button).
 *
 * App-entry setup (one time, e.g. main.tsx):
 *   import "@patternfly/react-core/dist/styles/base.css"; // PF6 base FIRST
 *   import "@golden-passport/ds-patternfly/styles";       // lib styles LAST
 *   // …then wrap your root in <ThemeProvider brand={…}>.
 */
import { useId, useState } from "react";
import {
  Button,
  FormSelect,
  FormSelectOption,
  InputGroup,
  InputGroupItem,
  InputGroupText,
  NumberInput,
  TextInput,
} from "@golden-passport/ds-patternfly";
import {
  AtIcon,
  CopyIcon,
  EyeIcon,
  EyeSlashIcon,
  SearchIcon,
} from "@patternfly/react-icons";

// #region Basic
export function Basic() {
  const id = useId();
  const [val, setVal] = useState("");

  return (
    <InputGroup>
      <InputGroupText>
        <AtIcon />
      </InputGroupText>
      <InputGroupItem isFill>
        <TextInput
          id={`${id}-basic`}
          aria-label="Email username"
          placeholder="username"
          value={val}
          onChange={(_e, v) => setVal(v)}
        />
      </InputGroupItem>
      <InputGroupText>example.com</InputGroupText>
    </InputGroup>
  );
}
// #endregion

// #region SearchWithScope
export function SearchWithScope() {
  const id = useId();
  const [search, setSearch] = useState("");
  const [scope, setScope] = useState("repos");

  return (
    <InputGroup>
      <InputGroupItem>
        <FormSelect
          value={scope}
          onChange={(_e, v) => setScope(v)}
          aria-label="Search scope"
          style={{ width: 140 }}
        >
          <FormSelectOption value="repos" label="Repositories" />
          <FormSelectOption value="issues" label="Issues" />
          <FormSelectOption value="users" label="Users" />
        </FormSelect>
      </InputGroupItem>
      <InputGroupItem isFill>
        <TextInput
          id={`${id}-search`}
          type="search"
          aria-label="Search"
          placeholder={`Search ${scope}…`}
          value={search}
          onChange={(_e, v) => setSearch(v)}
        />
      </InputGroupItem>
      <InputGroupItem>
        <Button variant="control" aria-label="Run search">
          <SearchIcon />
        </Button>
      </InputGroupItem>
    </InputGroup>
  );
}
// #endregion

// #region ShowHidePassword
export function ShowHidePassword() {
  const id = useId();
  const [pwd, setPwd] = useState("hunter2");
  const [showPwd, setShowPwd] = useState(false);

  return (
    <InputGroup>
      <InputGroupItem isFill>
        <TextInput
          id={`${id}-pwd`}
          type={showPwd ? "text" : "password"}
          aria-label="Password"
          value={pwd}
          onChange={(_e, v) => setPwd(v)}
        />
      </InputGroupItem>
      <InputGroupItem>
        <Button
          variant="control"
          aria-label={showPwd ? "Hide password" : "Show password"}
          onClick={() => setShowPwd((s) => !s)}
        >
          {showPwd ? <EyeSlashIcon /> : <EyeIcon />}
        </Button>
      </InputGroupItem>
    </InputGroup>
  );
}
// #endregion

// #region NumberWithUnitAndCopy
export function NumberWithUnitAndCopy() {
  const [amount, setAmount] = useState<number>(100);

  return (
    <InputGroup>
      {/* Merged locale + symbol — "US$" reads as a single
          currency token, clearer than two separate chips
          (e.g. "$ … USD") which can disagree (CA$ vs USD)
          and crowd the field. */}
      <InputGroupText>US$</InputGroupText>
      <InputGroupItem isFill>
        <NumberInput
          value={amount}
          onMinus={() => setAmount((a) => Math.max(0, a - 1))}
          onPlus={() => setAmount((a) => a + 1)}
          onChange={(e) => {
            const v = Number((e.target as HTMLInputElement).value);
            if (!Number.isNaN(v)) setAmount(v);
          }}
          min={0}
          inputAriaLabel="Amount"
          minusBtnAriaLabel="Decrease amount"
          plusBtnAriaLabel="Increase amount"
        />
      </InputGroupItem>
      <InputGroupItem>
        <Button
          variant="control"
          aria-label="Copy value"
          onClick={() => navigator.clipboard?.writeText(String(amount))}
        >
          <CopyIcon />
        </Button>
      </InputGroupItem>
    </InputGroup>
  );
}
// #endregion

// #region Disabled
export function Disabled() {
  const id = useId();

  return (
    <InputGroup>
      <InputGroupText isDisabled>
        <AtIcon />
      </InputGroupText>
      <InputGroupItem isFill isDisabled>
        <TextInput
          id={`${id}-disabled`}
          aria-label="Username"
          isDisabled
          value="ada.lovelace"
        />
      </InputGroupItem>
      <InputGroupItem isDisabled>
        <Button variant="control" isAriaDisabled>
          Save
        </Button>
      </InputGroupItem>
    </InputGroup>
  );
}
// #endregion

export default function InputGroupExample() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <Basic />
      <SearchWithScope />
      <ShowHidePassword />
      <NumberWithUnitAndCopy />
      <Disabled />
    </div>
  );
}
