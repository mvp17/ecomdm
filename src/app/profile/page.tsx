"use client";

import { useState, useEffect } from "react";
//import Image from 'next/image';
import withAuthGuard from "@/utils/withAuthGuard";
import {
  getProfileImage,
  uploadProfileImage,
} from "@/api/user-management-service";
import { useKeycloakContext } from "@/context/KeycloakContext";

const ProfilePage = () => {
  const [base64Url, setBase64Url] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { keycloak } = useKeycloakContext();

  // Load image on mount if ID exists
  useEffect(() => {
    fetchBase64Image(keycloak.subject!);
  }, [keycloak.subject]);

  const fetchBase64Image = async (userId: string) => {
    try {
      const res = await getProfileImage(userId);
      /*if (!res.data || !res.data.startsWith("data:image")) {
        throw new Error("Invalid base64 image data");
      }*/
      setBase64Url(res.data);
    } catch (err) {
      console.error("Failed to load image:", err);
      setBase64Url(null);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const MAX_SIZE_MB = 2;
    const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

    if (file.size > MAX_SIZE_BYTES) {
      alert(`Image is too large. Max size is ${MAX_SIZE_MB}MB.`);
      e.target.value = ""; // Reset file input
      return;
    }

    setSelectedFile(file);
    const formData = new FormData();
    formData.append("file", file);
    setIsLoading(true);

    try {
      const res = await uploadProfileImage(formData, keycloak.subject!);
      const newImageId = res.data;

      fetchBase64Image(newImageId);
    } catch (err) {
      console.error("Error uploading file:", err);
      alert("Failed to upload image. Please try again.");
      setBase64Url(null);
      setSelectedFile(null);
    } finally {
      setIsLoading(false);
      e.target.value = ""; // Reset file input
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-xl rounded-2xl text-center">
      <h1 className="text-2xl font-bold mb-4">Your Profile</h1>

      {base64Url ? (
        <div className="mb-4">
          {/* Using img because base64 doesn't benefit from next/image optimizations */}
          {/* eslint-disable-next-line @next/next/no-img-element*/}
          <img
            src={base64Url}
            alt="Profile"
            className="rounded-full mx-auto w-36 h-36 object-cover"
          />
        </div>
      ) : (
        <div className="mb-4 text-gray-500">No image uploaded</div>
      )}

      <p className="text-sm text-gray-500 mb-2">Max file size: 2MB</p>

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={isLoading}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
      />

      {selectedFile && (
        <p className="mt-2 text-sm text-green-600">
          Selected: {selectedFile.name}
        </p>
      )}
    </div>
  );
};

export default withAuthGuard(ProfilePage);
