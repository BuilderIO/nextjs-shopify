/** @jsxRuntime classic */
/** @jsx jsx */
import React, { FC, useState, useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/router'
import { LoadingDots } from '@components/ui'
import builderConfig from '@config/builder'
import { ProductGrid } from 'blocks/ProductGrid/ProductGrid'
import { Button, Themed, jsx, Input, Label } from 'theme-ui'
import { searchProducts } from '@lib/shopify/storefront-data-hooks/src/api/operations-builder'
import { ExpandModal } from 'react-spring-modal'
import { throttle } from 'lodash'
import 'react-spring-modal/styles.css'
import { Cross } from '@components/icons'

interface Props {
  className?: string
  id?: string
}

const Searchbar: FC<Props> = () => {
  const router = useRouter()
  const { q } = router.query
  const [isOpen, setIsOpen] = useState(false)
  const buttonRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsOpen(false)
  }, [router.asPath.split('?')[0]])

  return (
    <React.Fragment>
      <ExpandModal
        transitionConfig={{}}
        contentTransition={{}}
        overlayProps={{
          style: {
            maxWidth: 1920,
            left: '50%',
            transform: 'translateX(-50%)',
            overflow: 'auto',
            top: (buttonRef.current?.getBoundingClientRect().bottom || 0) + 15,
          },
        }}
        isOpen={isOpen}
      >
        <SearchModalContent
          initialSearch={q && String(q)}
          onSearch={(term: string) => {
            const op = q ? 'replace' : 'push'
            router[op]({
              pathname: router.asPath.split('?')[0],
              query: {
                q: term,
              },
            })
          }}
        />
      </ExpandModal>

      <Themed.div
        ref={buttonRef}
        as={Button}
        mx={2}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Search"
      >
        {isOpen ? (
          <Cross />
        ) : (
          <svg
            width="20"
            height="22"
            viewBox="0 0 20 22"
            fill="none"
            stroke="currentColor"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            />
          </svg>
        )}
      </Themed.div>
    </React.Fragment>
  )
}

const SearchModalContent = (props: {
  initialSearch?: string
  onSearch: (term: string) => any
}) => {
  const [search, setSearch] = useState(
    props.initialSearch && String(props.initialSearch)
  )
  const [products, setProducts] = useState([] as any[])
  const [loading, setLoading] = useState(false)
  const getProducts = async (searchTerm: string) => {
    setLoading(true)
    const results = await searchProducts(
      builderConfig,
      String(searchTerm),
      // TODO: pagination
      20,
      0
    )
    setSearch(searchTerm)
    setProducts(results)
    setLoading(false)
    if (searchTerm) {
      props.onSearch(searchTerm)
    }
  }

  useEffect(() => {
    if (search) {
      getProducts(search)
    }
  }, [])

  const throttleSearch = useCallback(throttle(getProducts), [])

  return (
    <Themed.div
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        p: [1, 2],
        width: '100%',
      }}
    >
      <Input
        type="search"
        sx={{ marginBottom: 15 }}
        defaultValue={props.initialSearch}
        placeholder="Search for products..."
        onChange={(event) => throttleSearch(event.target.value)}
      />
      {loading ? (
        <LoadingDots />
      ) : products.length ? (
        <>
          <Label>
            Search Results for "<strong>{search}</strong>"
          </Label>
          <ProductGrid
            cardProps={{
              imgHeight: 540,
              imgWidth: 540,
              imgPriority: false,
            }}
            products={products}
            offset={0}
            limit={products.length}
          ></ProductGrid>
        </>
      ) : (
        <span>
          {search ? (
            <>
              There are no products that match "<strong>{search}</strong>"
            </>
          ) : (
            <> </>
          )}
        </span>
      )}
    </Themed.div>
  )
}

export default Searchbar
