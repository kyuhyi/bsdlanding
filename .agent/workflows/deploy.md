---
description: GitHub 커밋/푸시 및 Vercel 배포 자동화
---

# 배포 워크플로우

이 워크플로우는 현재 프로젝트를 GitHub에 커밋/푸시하고 Vercel에 자동 배포합니다.

## 사전 요구사항

Vercel CLI가 설치되어 있어야 합니다. 설치되지 않은 경우:

```bash
npm install -g vercel
```

Vercel 로그인이 필요합니다 (최초 1회):

```bash
vercel login
```

## 배포 단계

// turbo-all

1. 모든 변경사항 스테이징

```bash
git add -A
```

2. 커밋 (메시지는 사용자에게 확인 필요)

```bash
git commit -m "커밋 메시지"
```

3. GitHub에 푸시

```bash
git push origin main
```

4. Vercel 프로덕션 배포

```bash
vercel --prod --yes
```

## 결과 확인

- GitHub: https://github.com/kyuhyi/bsdlanding
- Vercel: 배포 완료 후 URL이 터미널에 표시됩니다

## 참고사항

- `vercel --prod --yes` 플래그는 프로덕션 배포를 확인 없이 진행합니다
- Vercel 프로젝트가 이미 연결되어 있어야 합니다 (최초 `vercel` 실행 시 연결)
- GitHub 인증이 필요한 경우 Git Credential Manager가 처리합니다
