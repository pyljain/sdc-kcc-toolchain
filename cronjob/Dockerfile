FROM gcr.io/kpt-dev/kpt:latest

RUN apk add --update --no-cache npm ca-certificates wget diffutils \
    && update-ca-certificates

RUN wget https://github.com/cli/cli/releases/download/v1.1.0/gh_1.1.0_linux_386.tar.gz \
    && tar -zxvf gh_1.1.0_linux_386.tar.gz \
    && mv gh_1.1.0_linux_386/bin/gh /usr/local/bin \
    && chmod u+x /usr/local/bin/gh

ENTRYPOINT [ "gh" ]