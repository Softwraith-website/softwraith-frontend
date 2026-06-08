import { useEffect, useState } from "react";
import { Award, Download, Calendar, ShieldCheck, Loader2 } from "lucide-react";
import api from "../../utils/api";
import Spinner from "../../components/ui/Spinner";
import EmptyState from "../../components/ui/EmptyState";

export default function Certificates() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloadingId, setDownloadingId] = useState(null);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const { data } = await api.get("/certificates/my");
        setCertificates(data);
      } catch (err) {
        console.error("Failed to load certificates:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCertificates();
  }, []);

  const handleDownload = async (certId, courseTitle) => {
    try {
      setDownloadingId(certId);
      const apiBase = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
      window.open(`${apiBase}/certificates/download/${certId}`, "_blank");
    } catch (err) {
      console.error(err);
      alert("Failed to download certificate");
    } finally {
      setDownloadingId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Certificates</h1>
          <p className="text-gray-500 text-sm mt-1">
            View and download your earned certificates of completion.
          </p>
        </div>
        <div className="h-10 w-10 rounded-xl bg-amber-50 flex items-center justify-center border border-amber-200">
          <Award className="w-5 h-5 text-amber-600" />
        </div>
      </div>

      {certificates.length === 0 ? (
        <EmptyState
          title="No Certificates Earned Yet"
          message="Complete all curriculum requirements of any enrolled training program to 100% to generate your certificate."
          icon={Award}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certificates.map((cert) => (
            <div
              key={cert._id}
              className="group relative border border-amber-200 rounded-2xl bg-white p-6 md:p-8 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-amber-300 transition duration-300 overflow-hidden"
            >
              {/* Gold decorative gradient bar on top */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 to-yellow-600" />

              <div className="space-y-4">
                {/* Course Title */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-amber-800 transition duration-150">
                      {cert.course?.title}
                    </h3>
                    <p className="text-xs text-gray-400 font-mono mt-1">
                      ID: {cert.certificateNumber}
                    </p>
                  </div>
                  <ShieldCheck className="w-6 h-6 text-green-600 shrink-0" />
                </div>

                <hr className="border-gray-100" />

                {/* Details */}
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>
                      Issued: {new Date(cert.issuedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Download CTA */}
              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-end">
                <button
                  onClick={() => handleDownload(cert._id, cert.course?.title)}
                  disabled={downloadingId === cert._id}
                  className="flex items-center gap-2 px-4 py-2 border-2 border-amber-200 text-amber-700 bg-white text-sm font-semibold rounded-lg hover:bg-amber-50 hover:border-amber-300 transition duration-150 disabled:opacity-50"
                >
                  {downloadingId === cert._id ? (
                    <Loader2 className="w-4 h-4 animate-spin text-amber-700" />
                  ) : (
                    <Download className="w-4 h-4 text-amber-600" />
                  )}
                  Download PDF
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
