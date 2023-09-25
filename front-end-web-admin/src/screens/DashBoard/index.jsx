import React, { useState, useEffect } from "react";
import background from "../../assets/images/background.jpg";
import axios from "axios";
import { io } from "socket.io-client";

// const laporan = [
//   {
//     id_laporan: 1,
//     user: {
//       username: "user1",
//       id_user: 101,
//     },
//     kategori_bidang: "Kategori 1",
//     deskripsi: "Deskripsi laporan 1",
//     nama_file_gambar: "gambar1.jpg",
//     url_gambar: background,
//     waktu_submit: "2023-09-19 10:00:00",
//     status_laporan: "Dalam proses",
//     tingkat_prioritas: "Rendah",
//     pesan_dari_admin: "Pesan admin 1",
//   },
//   {
//     id_laporan: 2,
//     user: {
//       username: "user2",
//       id_user: 102,
//     },
//     kategori_bidang: "Kategori 2",
//     deskripsi: "Deskripsi laporan 2",
//     nama_file_gambar: "gambar2.jpg",
//     url_gambar: background,
//     waktu_submit: "2023-09-20 14:30:00",
//     status_laporan: "Selesai",
//     tingkat_prioritas: "Tinggi",
//     pesan_dari_admin: "Pesan admin 2",
//   },
//   {
//     id_laporan: 3,
//     user: {
//       username: "user3",
//       id_user: 103,
//     },
//     kategori_bidang: "Kategori 1",
//     deskripsi: "Deskripsi laporan 3",
//     nama_file_gambar: "gambar3.jpg",
//     url_gambar: background,
//     waktu_submit: "2023-09-21 16:45:00",
//     status_laporan: "Menunggu tindakan",
//     tingkat_prioritas: "Sedang",
//     pesan_dari_admin: "Pesan admin 3",
//   },
// ];

const socket = io.connect("https://backend-pelaporaninsiden.glitch.me");

// Tangani event ketika aplikasi ditutup
window.addEventListener("beforeunload", () => {
  // Memutuskan koneksi socket sebelum aplikasi ditutup
  socket.disconnect();
});

const DashBoard = () => {
  const [laporan, setLaporan] = useState(null);
  const [notif, setNotif] = useState(false);
  const [pesan_dari_admin, set_pesan_dari_admin] = useState("");

  useEffect(() => {
    ambilLaporan();
    socket.emit("join admin", "admin");
    socket.on("admin received", (message) => {
      console.log("ini pesan dari user", message);
      setNotif(true);
    });
  }, []);

  useEffect(() => {
    if (notif) {
      showAlert();
      ambilLaporan();
      setNotif(false);
    }
  }, [notif]);

  const ambilLaporan = () => {
    axios
      .get(`https://backend-pelaporaninsiden.glitch.me/api/laporan`)
      .then((response) => {
        setLaporan(response.data);
      })
      .catch((error) => console.log(error));
  };

  const tindakLaporan = async (id_user, id_laporan) => {
    console.log("ini id user loh", id_user);
    try {
      axios
        // .patch(`http://localhost:5000/api/laporan/status_laporan/tindak/${id_laporan}`)
        .patch(
          `https://backend-pelaporaninsiden.glitch.me/api/laporan/status_laporan/tindak/${id_laporan}`
        )
        .then(() => {
          const data = {
            id_user,
            message: "laporan telah ditindak lanjuti",
          };
          socket.emit("new message", data);
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log("ini error", error);
    }
  };

  const tindakLaporanSelesai = async (id_user, id_laporan) => {
    console.log("ini adalah ", pesan_dari_admin);
    try {
      axios
        .patch(
          `https://backend-pelaporaninsiden.glitch.me/api/laporan/status_laporan/selesai/${id_laporan}`,
          {
            pesan_dari_admin,
          }
        )
        .then(() => {
          const data = {
            id_user,
            message: "laporan telah selesai",
          };
          socket.emit("new message", data);
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log("ini error", error);
    }
  };

  const tindakLaporanDitolak = async (id_user, id_laporan) => {
    console.log("ini adalah ", pesan_dari_admin);
    try {
      axios
        .patch(
          `https://backend-pelaporaninsiden.glitch.me/api/laporan/status_laporan/tolak/${id_laporan}`,
          {
            pesan_dari_admin,
          }
        )
        .then(() => {
          const data = {
            id_user,
            message: "laporan ditolak",
          };
          socket.emit("new message", data);
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log("ini error", error);
    }
  };

  const showAlert = () => {
    alert("Ada notif alert bang");
  };

  return (
    <div>
      <h1 className="text-xl">Admin Panel</h1>
      <div className="overflow-x-auto">
        <table className="table table-md">
          <thead>
            <tr>
              <th>id laporan</th>
              <th>username</th>
              <th>kategori bidang</th>
              <th>deskripsi</th>
              <th>nama file gambar</th>
              <th>gambar</th>
              <th>waktu submit</th>
              <th>status laporan</th>
              <th>tingkat prioritas</th>
              <th>pesan dari admin</th>
              <th>aksi</th>
            </tr>
          </thead>
          <tbody>
            {laporan &&
              laporan.data.map((value, index) => {
                return (
                  <tr key={index}>
                    <td>{value.id_laporan}</td>
                    <td>{value.user.username}</td>
                    <td>{value.kategori_bidang}</td>
                    <td>{value.deskripsi}</td>
                    <td>{value.nama_file_gambar}</td>
                    <td>
                      <img src={value.url_gambar} alt="" width="200" />
                    </td>
                    <td>{value.waktu_submit}</td>
                    <td>{value.status_laporan}</td>
                    <td>{value.tingkat_prioritas}</td>
                    <td>{value.pesan_dari_admin}</td>
                    <td>
                      {value.status_laporan === "antrian" && (
                        <div>
                          <button
                            className="btn btn-accent"
                            onClick={() => {
                              tindakLaporan(
                                value.user.id_user,
                                value.id_laporan
                              );
                            }}
                          >
                            tindak
                          </button>
                        </div>
                      )}
                      {value.status_laporan === "tindak" && (
                        <div>
                          <button
                            className="btn btn-accent"
                            onClick={() => {
                              tindakLaporanSelesai(
                                value.user.id_user,
                                value.id_laporan
                              );
                            }}
                          >
                            selesai
                          </button>
                          <button
                            className="btn btn-accent"
                            onClick={() => {
                              tindakLaporanDitolak(
                                value.user.id_user,
                                value.id_laporan
                              );
                            }}
                          >
                            tolak
                          </button>
                        </div>
                      )}
                      {value.status_laporan !== "antrian" &&
                        value.status_laporan !== "tindak" && (
                          <div>
                            <p>Laporan telah diproses</p>
                          </div>
                        )}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <button className="btn btn-primary" onClick={showAlert}>
          Tampilkan alert
        </button>
      </div>
    </div>
  );
};

export default DashBoard;
