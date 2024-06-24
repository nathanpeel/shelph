"use client";

import { useState } from "react";
import { deleteAccount } from "../lib/actions";

export default function AccountSettings() {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [confirmText, setConfirmText] = useState("");

  return (
    <div className="flex flex-col items-center gap-5">
      <h2 className="text-2xl">Account Settings</h2>
      <div className="rounded-full h-1 w-[500px] bg-black"></div>
      <div className="flex gap-10 items-center">
        <button
          className="bg-red text-white text-center px-6 font-bold rounded-full py-2"
          onClick={() => {
            setShowDeleteConfirm(true);
          }}>
          Delete Account
        </button>
        <p>This cannot be undone</p>
      </div>
      {showDeleteConfirm && (
        <div className="border border-red rounded-2xl py-6 px-6 flex flex-col gap-5 items-start">
          <p>
            Are you sure you want to delete your account?
            <br></br>
            This action cannot be undone
          </p>
          <p>Type &quot;Delete My Account&quot; to confirm</p>
          <input
            type="text"
            value={confirmText}
            className="bg-gray rounded-full border border-red py-2 px-2"
            onChange={(e) => {
              setConfirmText(e.target.value);
            }}
          />
          <div className="flex gap-6">
            <button
              onClick={() => {
                setShowDeleteConfirm(false);
              }}>
              Cancel
            </button>
            {confirmText === "Delete My Account" && (
              <button
                onClick={() => {
                  deleteAccount();
                }}
                className="underline text-red">
                Delete
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
