import { Button, IconButton, Modal } from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../app/store/store";
import {
  changeStudentNameThunk,
  deleteStudentThunk,
  fetchClass,
  StudentType,
  updateClassNameThunk,
} from "../../bll/ classroomReducer";
import { getClass } from "../../../../app/store/selectors";
import { useTranslation } from "react-i18next";
import style from "../classroom.module.scss";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import ReactDOM from "react-dom";
import { useCheckTeacherRole } from "../../../../shared/utilities/checkUserRole";

type EditClassParams = {
  id: string;
};

const EditClass = () => {
  useCheckTeacherRole();
  const { id } = useParams<EditClassParams>();
  const dispatch = useDispatch<AppDispatch>();
  const currentClass = useSelector(getClass);
  const { t } = useTranslation(["classroom"]);

  useEffect(() => {
    if (id) {
      dispatch(fetchClass(+id));
    }
  }, []); //eslint-disable-line

  // Local state for modals
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [modalStudent, setModalStudent] = useState<StudentType>();
  const [editingStudentId, setEditingStudentId] = useState<number>();
  const [studentName, setStudentName] = useState<string>("");
  const [editingClassName, setEditingClassName] = useState<string | undefined>(
    undefined,
  );

  const handleEditClassName = () => {
    if (!editingClassName && currentClass) {
      setEditingClassName(currentClass.title);
    } else {
      // Save the changes to the class name
      if (currentClass && editingClassName) {
        dispatch(
          updateClassNameThunk({
            newName: editingClassName,
            classId: currentClass.id,
          }),
        );
        setEditingClassName(undefined);
      }
    }
  };

  const handleClassNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEditingClassName(event.target.value);
  };

  const handleGetAllPasswords = () => {
    const printableTable = (
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th style={cellStyle}>{t("name")}</th>
            <th style={cellStyle}>{t("username")}</th>
            <th style={cellStyle}>{t("password")}</th>
          </tr>
        </thead>
        <tbody>
          {currentClass &&
            currentClass.studentsList.map((student) => (
              <tr key={student.id}>
                <td style={cellStyle}>{student.name}</td>
                <td style={cellStyle}>{student.username}</td>
                <td style={cellStyle}>{student.password}</td>
              </tr>
            ))}
        </tbody>
      </table>
    );

    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(
        "<html><head><title>Passwords</title></head><body>",
      );
      printWindow.document.write("<h2>Список Паролей</h2>");

      // Create a div element and render the printableTable inside it
      const tableContainer = document.createElement("div");
      ReactDOM.render(printableTable, tableContainer);

      // Append the innerHTML of the div to the printWindow document
      printWindow.document.write(tableContainer.innerHTML);
      printWindow.document.write("</body></html>");
      printWindow.document.close();
      printWindow.print();
    }
  };

  const cellStyle: React.CSSProperties = {
    border: "2px solid #dddddd",
    textAlign: "center",
    padding: "16px",
  };

  const handleEdit = (id: number, name: string) => {
    if (!editingStudentId && studentName === "") {
      setEditingStudentId(id);
      setStudentName(name);
    } else {
      onStudentNameBlur();
    }
  };

  const handleStudentNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStudentName(event.target.value);
  };

  const handleOpenDeleteModal = (student: StudentType) => {
    setModalStudent(student);
    setDeleteModalOpen(true);
  };

  const onStudentNameBlur = () => {
    if (editingStudentId && studentName && currentClass) {
      dispatch(
        changeStudentNameThunk({
          studentId: editingStudentId,
          classId: currentClass.id,
          newName: studentName,
        }),
      );
      setEditingStudentId(undefined);
      setStudentName("");
    }
  };

  const handleOpenPasswordModal = (student: StudentType) => {
    setModalStudent(student);
    setPasswordModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const handleClosePasswordModal = () => {
    setPasswordModalOpen(false);
  };

  const handleDeleteStudent = (studentId: number) => {
    dispatch(deleteStudentThunk(studentId));
    setDeleteModalOpen(false);
  };

  return (
    <div className={style.editClassContainer}>
      <div className={style.classTitleWrapper}>
        <h2>{t("class")}</h2>
        <div className={style.classTitleEditWrapper}>
          {editingClassName !== undefined ? (
            <>
              <input
                type="text"
                value={editingClassName}
                onChange={handleClassNameChange}
                onBlur={handleEditClassName}
              />
            </>
          ) : (
            <h2>{currentClass?.title}</h2>
          )}
          <IconButton onClick={handleEditClassName}>
            <EditIcon />
          </IconButton>
        </div>
      </div>
      <div className={style.studentsListTitle}>
        <h2>{t("students-list")}</h2>
        <Button onClick={handleGetAllPasswords}>
          {t("get-all-passwords")}
        </Button>
      </div>
      <div className={style.studentsListWrapper}>
        <table>
          <thead>
            <tr>
              <th>№</th>
              <th>{t("full-name")}</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {currentClass &&
              currentClass.studentsList.map((student, index) => (
                <tr key={student.id}>
                  <td className={style.studentIndexWrapper}>{index + 1}</td>
                  <td className={style.studentNameWrapper}>
                    {editingStudentId === student.id ? (
                      <input
                        type="text"
                        value={studentName}
                        onChange={handleStudentNameChange}
                        onBlur={onStudentNameBlur}
                      />
                    ) : (
                      <>{student.name}</>
                    )}
                  </td>
                  <td className={style.buttonsWrapper}>
                    <IconButton
                      onClick={() => handleEdit(student.id, student.name)}
                    >
                      <EditIcon titleAccess={t("edit")} />
                    </IconButton>
                    <IconButton
                      onClick={() => handleOpenDeleteModal({ ...student })}
                    >
                      <DeleteIcon titleAccess={t("delete")} />
                    </IconButton>
                    <IconButton
                      onClick={() => handleOpenPasswordModal({ ...student })}
                    >
                      <VpnKeyIcon titleAccess={t("password")} />
                    </IconButton>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Delete Modal */}
      <Modal
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        open={deleteModalOpen}
        onClose={handleCloseDeleteModal}
      >
        <>
          {modalStudent && (
            <div className={style.modalContainer}>
              <h2>{t("delete-confirmation")}</h2>
              <p>
                {t("are-you-sure-you-want-to-delete")} {modalStudent.name}?
              </p>
              <Button onClick={handleCloseDeleteModal}>{t("no")}</Button>
              <Button onClick={() => handleDeleteStudent(modalStudent.id)}>
                {t("yes")}
              </Button>
            </div>
          )}
        </>
      </Modal>

      {/* Password Modal */}
      <Modal
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        open={passwordModalOpen}
        onClose={handleClosePasswordModal}
      >
        <>
          {modalStudent && (
            <div className={style.modalContainer}>
              <h2>
                {modalStudent.name} {t("password")}
              </h2>
              <p>
                {t("username")}: {modalStudent.username}
              </p>
              <p>
                {t("password")}: {modalStudent.password}
              </p>
              <Button onClick={handleClosePasswordModal}>{t("close")}</Button>
            </div>
          )}
        </>
      </Modal>
    </div>
  );
};

export default EditClass;
