"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Camera, CameraOff, AlertCircle, Loader2 } from "lucide-react";
import { Product } from "@/types/product";

type CameraState = "idle" | "requesting" | "active" | "error";

interface CameraPanelProps {
  selectedProduct?: Product | null;
}

export default function CameraPanel({ selectedProduct }: CameraPanelProps) {
  const [cameraState, setCameraState] = useState<CameraState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Stop all camera tracks and clear stream reference
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        track.stop();
      });
      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setCameraState("idle");
    setErrorMessage(null);
  }, []);

  // Clean up stream tracks on component unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    };
  }, []);

  // Connect stream to video element when active
  useEffect(() => {
    if (cameraState === "active" && videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
      videoRef.current.play().catch((err) => {
        console.error("Camera video playback failed:", err);
      });
    }
  }, [cameraState]);

  // Request camera access using browser getUserMedia API
  const enableCamera = async () => {
    setErrorMessage(null);

    // Verify browser support & secure context
    if (
      typeof window === "undefined" ||
      !navigator.mediaDevices ||
      !navigator.mediaDevices.getUserMedia
    ) {
      setErrorMessage(
        "Camera access is not supported by your browser or requires a secure connection (HTTPS)."
      );
      setCameraState("error");
      return;
    }

    setCameraState("requesting");

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: "user",
        },
        audio: false,
      });

      streamRef.current = stream;
      setCameraState("active");
    } catch (err: unknown) {
      let friendlyError = "Unable to access camera. Please check your browser permissions.";

      if (err instanceof DOMException) {
        if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
          friendlyError =
            "Camera permission was denied. Please allow camera access in your browser settings to continue.";
        } else if (err.name === "NotFoundError" || err.name === "DevicesNotFoundError") {
          friendlyError =
            "No camera device was detected. Please connect a webcam or enable your device camera.";
        } else if (err.name === "NotReadableError" || err.name === "TrackStartError") {
          friendlyError =
            "Your camera is currently in use by another application. Please close other camera apps and retry.";
        } else if (err.name === "OverconstrainedError") {
          friendlyError = "Your camera does not meet the requested video constraints.";
        } else if (err.name === "SecurityError") {
          friendlyError = "Camera access is restricted due to security policies or insecure origin.";
        }
      }

      setErrorMessage(friendlyError);
      setCameraState("error");
    }
  };

  return (
    <section
      aria-label="Camera preview area"
      className="flex-1 h-full min-h-[480px] md:min-h-0 relative flex flex-col items-center justify-center bg-[#FAFAFA] overflow-hidden"
    >
      {/* ACTIVE CAMERA VIEW */}
      {cameraState === "active" && (
        <div className="relative w-full h-full flex items-center justify-center bg-black">
          {/* Mirrored live video for natural try-on reflection */}
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover -scale-x-100"
            aria-label="Live camera preview stream"
          />

          {/* Minimal live status badge */}
          <div className="absolute top-5 left-5 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white select-none">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-medium tracking-wide">Live</span>
          </div>

          {/* Selected product status (honest indication without simulated rendering) */}
          {selectedProduct && (
            <div className="absolute top-5 right-5 hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white select-none max-w-xs">
              <span className="text-[9px] uppercase tracking-wider font-semibold text-[#A1A1AA]">
                {selectedProduct.brand}
              </span>
              <span className="text-[11px] font-medium text-white truncate max-w-[140px]">
                {selectedProduct.shortName}
              </span>
            </div>
          )}

          {/* Minimal "Turn off camera" button */}
          <div className="absolute bottom-6 inset-x-0 flex justify-center pointer-events-none">
            <button
              type="button"
              onClick={stopCamera}
              className="pointer-events-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/90 hover:bg-white text-black text-xs font-medium tracking-wide transition-all duration-150 backdrop-blur-md shadow-lg active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white cursor-pointer"
              aria-label="Turn off camera"
            >
              <CameraOff className="w-3.5 h-3.5 text-black" />
              <span>Turn off camera</span>
            </button>
          </div>
        </div>
      )}

      {/* REQUESTING / PERMISSION PROMPT STATE */}
      {cameraState === "requesting" && (
        <div className="flex flex-col items-center text-center px-6 max-w-sm">
          <div className="w-14 h-14 rounded-full bg-white border border-[#EAEAEA] flex items-center justify-center mb-6 shadow-sm">
            <Loader2 className="w-6 h-6 text-[#0A0A0A] animate-spin" />
          </div>
          <h2 className="text-xl sm:text-2xl font-normal tracking-tight text-[#0A0A0A]">
            Requesting camera
          </h2>
          <p className="text-xs text-[#737373] mt-2 leading-relaxed">
            Please approve the camera permission prompt in your browser.
          </p>
        </div>
      )}

      {/* ERROR STATE */}
      {cameraState === "error" && (
        <div className="flex flex-col items-center text-center px-6 max-w-md">
          <div className="w-14 h-14 rounded-full bg-white border border-[#EAEAEA] flex items-center justify-center mb-6 shadow-sm">
            <AlertCircle className="w-6 h-6 text-[#0A0A0A] stroke-[1.5]" />
          </div>
          <h2 className="text-xl sm:text-2xl font-normal tracking-tight text-[#0A0A0A]">
            Camera unavailable
          </h2>
          <p className="text-xs text-[#737373] mt-2 max-w-xs leading-relaxed">
            {errorMessage || "Unable to access your camera."}
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
            <button
              type="button"
              onClick={enableCamera}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-black text-white hover:bg-[#262626] text-xs font-medium tracking-wider uppercase transition-all duration-150 active:scale-95 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Try again
            </button>
            <button
              type="button"
              onClick={stopCamera}
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-full text-xs text-[#737373] hover:text-[#0A0A0A] transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* IDLE / INITIAL STATE */}
      {cameraState === "idle" && (
        <div className="flex flex-col items-center text-center px-6 max-w-sm">
          {/* Simple camera icon */}
          <div className="w-14 h-14 rounded-full bg-white border border-[#EAEAEA] flex items-center justify-center mb-6 shadow-sm">
            <Camera className="w-6 h-6 text-[#0A0A0A] stroke-[1.5]" aria-hidden="true" />
          </div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-[#0A0A0A]">
            See it on you.
          </h2>

          {/* Supporting text */}
          <p className="text-xs sm:text-sm text-[#737373] mt-2 font-normal leading-relaxed">
            Enable your camera to get started.
          </p>

          {/* Primary Action Button */}
          <button
            type="button"
            onClick={enableCamera}
            className="mt-6 inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-black text-white hover:bg-[#222222] active:scale-95 text-xs font-medium tracking-wider uppercase transition-all duration-150 shadow-sm cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            <span>Enable camera</span>
          </button>

          {/* Privacy Note */}
          <p className="mt-5 text-[11px] text-[#8E8E93] max-w-[260px] leading-relaxed select-none">
            Your camera is activated only with your permission.
          </p>
        </div>
      )}
    </section>
  );
}
