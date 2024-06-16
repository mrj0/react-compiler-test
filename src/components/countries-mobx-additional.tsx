"use client";
/* eslint-disable react/no-unescaped-entities */
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table";
import Link from "next/link";
import React from "react";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { useLogOnReRender } from "@/helpers/log-on-re-render";
import { observer, useLocalObservable } from "mobx-react-lite";
import { CountryStore } from "@/stores/CountryStores";

const CountryRow = observer(({
  name,
  onDelete,
}: {
  name: string;
  onDelete: (n: string) => void;
}) => {
  useLogOnReRender("CountryRow");
  return (
    <TableRow key={`${name.toLowerCase()}`}>
      <TableCell className="font-medium">
        <Link href={`/country/${name.toLowerCase()}`}>{name}</Link>
      </TableCell>
      <TableCell className="text-right">
        <Button onClick={() => onDelete(name)} variant="outline">
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
});

const CountryTable = observer(({
  store,
}: {
  store: CountryStore
}) => {
  useLogOnReRender("CountryRow");
  return (
    <Table>
      <TableCaption>Supported countries list.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[400px]">Name</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {store.countries.map(({ name }) => (
          <CountryRow name={name} onDelete={store.deleteCountry} key={name} />
        ))}
      </TableBody>
    </Table>
  );
});

export const CountriesMobxAdditional = observer(() => {
  const store = useLocalObservable(() => new CountryStore());

  return (
    <div>
      <h3 className="text-3xl my-4">Mobx example: memoization is automatic</h3>
      <ul className="text-lg my-4">
        <li>Type in input fields - rows and cells don't re-render</li>
        <li>Click Add button - rows and cells don't re-render</li>
        <li>Click Delete button - rows and cells don't re-render</li>
      </ul>
      <CountryTable store={store} />
      <div className="my-4 flex items-center">
        <Input
          type="text"
          placeholder="Add new country"
          value={store.inputValue}
          onChange={store.onInputValueChange}
        />
        <button onClick={store.onClickAddCountry}>Add</button>
      </div>
    </div>
  );
});

CountriesMobxAdditional.displayName = "CountriesMobxAdditional";
