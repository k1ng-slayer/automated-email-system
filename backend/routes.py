import smtplib
from fastapi import APIRouter, File, Form, HTTPException, UploadFile, status

from services.email_service import is_allowed_excel, send_emails

router = APIRouter(prefix="/api")


async def _read_and_validate_excel(file: UploadFile) -> bytes:
    if not file.filename or not is_allowed_excel(file.filename):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Upload a valid Excel file (.xlsx, .xlsm, .xlsb, .xltx, .xltm, .xls, .xlt, .xml).",
        )

    workbook_bytes = await file.read()
    if not workbook_bytes:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Uploaded file is empty.",
        )
    return workbook_bytes


@router.post("/defaulter/send")
async def defaulter_send(
    email: str = Form(...),
    password: str = Form(...),
    message: str = Form(""),
    threshold: float = Form(...),
    sheet_name: str = Form("Sheet1"),
    file: UploadFile = File(...),
):
    if threshold < 0 or threshold > 100:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Threshold must be between 0 and 100.",
        )

    workbook_bytes = await _read_and_validate_excel(file)

    try:
        result = send_emails(
            mode="defaulter",
            workbook_bytes=workbook_bytes,
            sender_email=email,
            sender_password=password,
            message=message,
            threshold_attendance=threshold,
            sheet_name=sheet_name,
        )
        return result.as_dict()
    except smtplib.SMTPAuthenticationError as exc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="SMTP authentication failed. Check your email/password or app password settings.",
        ) from exc
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc),
        ) from exc
    except smtplib.SMTPException as exc:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"SMTP error: {exc}",
        ) from exc


@router.post("/customize/send")
async def customize_send(
    email: str = Form(...),
    password: str = Form(...),
    subject: str = Form(...),
    message: str = Form(...),
    sheet_name: str = Form("Sheet1"),
    file: UploadFile = File(...),
):
    workbook_bytes = await _read_and_validate_excel(file)

    if not subject.strip():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Subject is required.",
        )

    if not message.strip():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Message is required.",
        )

    try:
        result = send_emails(
            mode="customize",
            workbook_bytes=workbook_bytes,
            sender_email=email,
            sender_password=password,
            subject=subject,
            message=message,
            sheet_name=sheet_name,
        )
        return result.as_dict()
    except smtplib.SMTPAuthenticationError as exc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="SMTP authentication failed. Check your email/password or app password settings.",
        ) from exc
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc),
        ) from exc
    except smtplib.SMTPException as exc:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"SMTP error: {exc}",
        ) from exc
